package DeezNuts::Controller::Root;

use Mojo::Base 'Mojolicious::Controller';

use DeezNuts::Model::Player;

my $players = {};

sub index {
    my ( $c ) = @_;
    $c->render( template => 'index' );
}

sub connect {
    my ( $c ) = @_;

    $c->app->log->info( sprintf "Player connected: %s", $c->tx->connection );

    # Keep track of the new player that just connected.
    my $new_player = DeezNuts::Model::Player->new(
	id => sprintf( "%s", $c->tx->connection ),
	tx => $c->tx,
    );

    # Grab the player data for all currently connected players.
    my @other_players_data =
	map  { $_->serialize    }
        grep { $_->is_connected }
        values %$players;

    # Tell the player that just connected where all the other players are.
    $new_player->send({
	welcome => $new_player->id,
	players => [ @other_players_data ],
    });

    # Tell all other players where the player that just connected is.
    $_->send( $new_player->serialize ) for values %$players;

    $players->{ $new_player->id } = $new_player;

    $c->on( finish => sub {
	$c->app->log->debug(
	    sprintf "Player disconnected: %s", $c->tx->connection
        );
	delete $players->{$c->tx->connection};

	# Notify the others that the player left the game
	$_->send({ goodbye => $c->tx->connection })
	    for values %$players;
    });

    $c->on( json => sub {
	my ( $self, $msg ) = @_;

	# Update our player state.
	my $player = $players->{ $c->tx->connection };
	$player->x( $msg->{x} );
	$player->y( $msg->{y} );
	$player->frame( $msg->{frame} );

	my @other_players = grep {
	    $_ ne $c->tx->connection
	} keys %$players;
	    
	# Send the update to every other client.
	for my $other_player ( @other_players ) {
	    $players->{$other_player}->send( $player->serialize );
	}
    });
}   

1;
