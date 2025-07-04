<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit2d95a9db92cf33530f7008c1f6151fab
{
    public static $prefixLengthsPsr4 = array (
        'R' => 
        array (
            'RapidCRM\\' => 9,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'RapidCRM\\' => 
        array (
            0 => __DIR__ . '/../..' . '/app',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit2d95a9db92cf33530f7008c1f6151fab::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit2d95a9db92cf33530f7008c1f6151fab::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit2d95a9db92cf33530f7008c1f6151fab::$classMap;

        }, null, ClassLoader::class);
    }
}
