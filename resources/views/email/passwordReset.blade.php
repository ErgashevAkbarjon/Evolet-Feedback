@extends('email.master')

@section('title')
    Сброс пароля
@endsection

@section('content')

<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 100px 0px;">
    <tr>
        <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 100px 0px;">
                <tr>
                    <td align="left" bgcolor="#ffffff"
                        style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf; ">
                        <h1
                            style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                            Сброс пароля</h1>
                    </td>
                </tr>
                <tr>
                    <td align="left" bgcolor="#ffffff"
                        style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                        <p style="margin: 0;">Для того чтобы сбросить пароль нажмите на кнопку:</p>
                    </td>
                </tr>
                <tr>
                    <td align="left" bgcolor="#ffffff">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                    <table border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td align="center" bgcolor="#1a82e2"
                                                style="border-radius: 6px;  background: #a8cf45;">
                                                <a href="{{$setUpLink}}"
                                                    style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                                                    Сбросить пароль
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
        </td>
</table>
</tr>

</table>

@endsection