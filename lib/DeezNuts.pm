package DeezNuts;

our $VERSION = '0.1';

use Mojo::Base 'Mojolicious';

sub startup {
    my ( $self ) = @_;

    $self->app->plugin( 'AssetPack' => {
	pipes => [ qw( JavaScript Combine ) ],
    });

    $self->app->asset->process(
	'app.js' => qw( jquery-3.2.1.min.js phaser.min.js deeznuts.js ),
    );

    $self->routes->get( '/' )->to( 'root#index' );
    $self->routes->websocket( '/connect' )->to( 'root#connect' );
}

1;
