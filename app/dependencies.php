<?php
$container = $app->getContainer();

// View renderer
$container['renderer'] = function ($c) {
    $settings = $c->get('settings')['renderer'];
    return new Slim\Views\PhpRenderer($settings['template_path']);
};

// Monolog
$container['logger'] = function ($c) {
    $settings = $c->get('settings')['logger'];
    $logger = new Monolog\Logger($settings['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path'], $settings['level']));
    return $logger;
};

// Doctrine
$container['em'] = function ($c) {
    $settings = $c->get('settings')['doctrine'];
    $isDevMode = true;
    $path = $settings['meta']['entity_path'];
    $proxy_dir = $settings['meta']['proxy_dir'];
    $dbParams = $settings['connection'];
    $config = \Doctrine\ORM\Tools\Setup::createAnnotationMetadataConfiguration($path,$isDevMode,$proxy_dir,null,false);
    return \Doctrine\ORM\EntityManager::create($dbParams, $config);
};

$container['HomeController'] = function ($c){
    return new \App\Controller\HomeController($c);
};
