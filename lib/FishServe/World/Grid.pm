package FishServe::World::Grid;

use Moo;
use strictures 2;

use Games::Dice::Loaded;
#use Math::Random::NormalDistribution;
use Statistics::Distribution::Generator qw( exponential );

has num_fish => (
    is => 'rw',
);

has random_weight_generator => (
    is => 'lazy',
);

sub _build_random_weight_generator {
    my $r = exponential( 0.7 );
    sub { .5 + $r };
}

sub cast {
    my ( $self ) = @_;

    return -1 unless $self->num_fish;

    my $no_fish = ( 9999 / 10_000 ) ** $self->num_fish;
    my $fish = 1 - $no_fish;

    #die( "$fish $no_fish" );

    # 25% chance of a bite, 75% chance of no bite.
    my $die = Games::Dice::Loaded->new( $fish, $no_fish );

    if ( $die->roll == 1 ) {
        $self->num_fish( $self->num_fish - 1 );
        return $self->random_weight_generator->();
        #my $weight = $start + int rand $end - $start + 1;
    }

    return;
}

1;
