<?php
use Doctrine\ORM\Tools\Console\ConsoleRunner;

$settings = require __DIR__ . '/../app/settings.php';
$settings = $settings['settings']['doctrine'];

$isDevMode = true;
$path = $settings['meta']['entity_path'];
$proxy_dir = $settings['meta']['proxy_dir'];
$config = \Doctrine\ORM\Tools\Setup::createAnnotationMetadataConfiguration($path,$isDevMode,$proxy_dir,null,false);

$em = \Doctrine\ORM\EntityManager::create($settings['connection'], $config);

return ConsoleRunner::createHelperSet($em);