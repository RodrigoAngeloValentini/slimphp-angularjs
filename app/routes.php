<?php
// Routes

$app->get('/', function ($request, $response, $args) {
    return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/admin/', function ($request, $response, $args){
    return $this->renderer->render($response, 'admin.phtml', $args);
});

$app->group('/api',function() {
    $this->get('/photos', App\Controller\HomeController::class . ':index');
    $this->post('/photos', App\Controller\HomeController::class . ':save');
    $this->put('/photos/{id}', App\Controller\HomeController::class . ':edit');
    $this->delete('/photos/{id}', App\Controller\HomeController::class . ':delete');
});

