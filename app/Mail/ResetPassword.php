<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPassword extends Mailable
{
    use Queueable, SerializesModels;

    private $resetToken;

    public function __construct($resetToken) {
        $this->resetToken = $resetToken;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $setUpLink = url('/password/reset/' . $this->resetToken);
        
        return $this->view('email.passwordReset')->with('setUpLink', $setUpLink);
    }
}