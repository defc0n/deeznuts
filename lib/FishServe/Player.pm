package FishServe::Player;

use Moo;
use strictures 2;

use Time::HiRes     qw( time );
use FishServe::Util qw( distance );

use constant MAX_CAST_DISTANCE => 25;

has id => (
    is       => 'ro',
    required => 1,
);

has name => (
    is       => 'ro',
    required => 1,
);

has x => (
    is => 'ro',
);

has y => (
    is => 'ro',
);

has last_cast_time => (
    is      => 'ro',
    default => time,
);

has world => (
    is => 'ro',
);

sub move {
    my ( $self, $x, $y ) = @_;
    $self->x( $x );
    $self->y( $y );
}

sub cast {
    my ( $self, $x, $y ) = @_;

    my $last_cast_time = $self->last_cast_time;
    my $new_cast_time  = time;

    $self->last_cast_time( $new_cast_time );

    # Don't allow cheaters to fish too fast.
    my $delta = $new_cast_time - $last_cast_time;
    return if $delta < 1;

    # Don't allow cheaters to fish from too far away.
    return if distance( $self->x, $self->y, $x, $y ) > MAX_CAST_DISTANCE;

    my $fish = $world->cast( $x, $y );
}

1;
