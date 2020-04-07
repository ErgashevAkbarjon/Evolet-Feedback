<?php

namespace App\Http\Controllers;

use App\Helpers\Paginator;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{

    /**
     * Analog of public_path() from Laravel, returns full path to public folder.
     *
     */
    public function public_path($pathToConcat = '')
    {
        return base_path() . '/public' . $pathToConcat;
    }

    /**
     * Removes file from public folder
     *
     * @param string $path Relative path from public folder
     */
    public function deletePublicFile($path)
    {
        $filePath = $this->public_path($path);

        unlink($filePath);
    }

    /**
     * Converts array with keys "parent_id" to nested tree array where nested
     * nodes will be stored into "children" key
     *
     */
    protected function toTree(array $array, $parentId = null)
    {
        $tree = [];
        foreach ($array as $item) {
            if ($item['parent_id'] === $parentId) {

                foreach ($array as $innerItem) {
                    if ($item['id'] === $innerItem['parent_id']) {
                        $item['children'] = $innerItem;
                    }
                }
                $item['children'] = $this->toTree($array, $item['id']);
                $tree[] = $item;
            }
        }
        return $tree;
    }

    /**
     * Processes request items for index method: 
     * - Filtering: ?[field]=[value],
     * - Sorting: ?sortBy=[field] and ?sortByDesc=[field],
     * - Pagination: ?page=[number] and ?perPage=[number] and ?no_pagination
     */
    protected function processIndexRequestItems(Request $request, $query, bool $withPagination = true)
    {
        $filteredQuery = $this->filterByRequest($request, $query);

        $sortedResultCollection = $this->sortByRequest($request, $filteredQuery->get());

        if(!$withPagination || $request->has('no_pagination')) return $sortedResultCollection;

        $paginatedResult = $this->paginateByRequest($request, $sortedResultCollection);

        return $paginatedResult;
    }

    /**
     * Add filters to query from request items, for example:
     * - URL: ?name=John -> Query: $query->where('name', 'John')
     *
     */
    protected function filterByRequest(Request $request, $query)
    {
        if ($request->method() !== 'GET') {
            return $query;
        }

        $tempQuery = clone $query;

        $sampleModel = $tempQuery->first();

        if (!$sampleModel) {
            return $query;
        }

        $modelAttributes = array_keys($sampleModel->getAttributes());
        $requests = $request->all();

        foreach ($requests as $key => $value) {
            if ($value && in_array($key, $modelAttributes)) {
                $query = $query->where($key, $value);
            }
        }

        return $query;
    }

    /**
     * Sorts result collection by request items, for example:
     * - URL: ?sortBy=name -> Collection: $result->sortBy('name')
     * - URL: ?sortByDesc=name -> Collection: $result->sortByDesc('name')
     *
     */
    protected function sortByRequest(Request $request, Collection $collection)
    {
        if ($request->has('sortByDesc')) {
            return $collection->sortByDesc($request->sortByDesc)->values();
        }

        if($request->has('sortBy')){
            return $collection->sortBy($request->sortBy)->values();
        }

        return $collection;
    }

    /**
     * Custom paginator to paginate collection by request items: 
     * - ?page=[number]
     * - ?perPage=[number | 'all']
     */
    protected function paginateByRequest(Request $request, Collection $collection)
    {
        return new Paginator($collection, $request->perPage, $request->page);
    }
}
