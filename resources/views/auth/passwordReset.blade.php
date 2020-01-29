<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Evolet Feedback</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="/css/app.css"/>
</head>
<body>
    <div class="container h-100">
        <div class="row justify-content-center align-items-center h-100">
            <div class="col-5">
                <div class="card">
                    <div class="card-header">
                        Установка нового пароля
                    </div>
                    <div class="card-body">
                        <form action="/password/reset/{{$token}}" method="POST">
                            <div class="form-group">
                                <label for="password">Новый пароль</label>
                                <input type="password" class="form-control" name="password" />
                            </div>
                            <div class="form-group">
                                <label for="password_confirmation">Повторите пароль</label>
                                <input type="password" class="form-control" name="password_confirmation" />
                            </div>
                            <div class="text-right">
                                <button type="submit" class="btn btn-primary">Сохранить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>