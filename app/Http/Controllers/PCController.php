<?php

namespace App\Http\Controllers;

use App\PC;
use App\Role;
use Illuminate\Http\Request;

class PCController extends Controller
{
    const PC_LOGO_FOLDER = "/images/pc/";

    public function __construct() {
        $adminMIddleware = "role:" . Role::ADMIN_ROLE_NAME;

        $this->middleware($adminMIddleware, ['except' => ['index']]);
    }

    public function index(Request $request)
    {
        $query = PC::query();

        return $this->processIndexRequestItems($request, $query, false);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'logo' => 'required|image',
        ]);

        $newPC = PC::create($request->only('name'));

        $logo = $request->file('logo');

        $savedLogoPath = $this->saveLogo($newPC->id, $logo);

        $newPC->logo = $savedLogoPath;

        $newPC->save();

        return $newPC;
    }

    public function show($id)
    {
        return PC::with('customers.user')->where('id', $id)->first();
    }

    public function update($id, Request $request)
    {
        $pcToUpdate = PC::find($id);
        
        if($request->has('name')){
            $pcToUpdate->name = $request->name;
        }

        if($request->hasFile('logo')){
            $pcToUpdate->logo = $this->saveLogo($pcToUpdate->id, $request->file('logo'));
        }

        $pcToUpdate->save();

        return $pcToUpdate->load('customers.user');
    }

    public function destroy($id)
    {
        $pcToDelete = PC::find($id);
        if($pcToDelete->logo){
            $this->deletePublicFile($pcToDelete->logo);
        }
        $pcToDelete->delete();
    }

    /**
     * Helpers
     */

    private function saveLogo($name, $logo)
    {
        $logoExtension = $logo->extension();
        $logoName = "$name.$logoExtension";
        $publicPath = $this->public_path();
        
        $logo->move($publicPath . self::PC_LOGO_FOLDER, $logoName);

        return self::PC_LOGO_FOLDER . $logoName;
    }

}
