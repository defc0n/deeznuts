package DeezNuts::Model::Player;

use Moo;

has id => ( is => 'ro', required => 1 );
has tx => ( is => 'ro', required => 1 );

has x     => ( is => 'rw' );
has y     => ( is => 'rw' );
has frame => ( is => 'rw' );

sub send {
    my ( $self, $data ) = @_;
    $self->tx->send({ json => $data });
}

sub serialize {
    my ( $self ) = @_;

    return {
	id    => $self->id,
	x     => $self->x,
	y     => $self->y,
	frame => $self->frame,
    };
}

sub is_connected {
    my ( $self ) = @_;
    defined $self->x and defined $self->y;
}

1;
