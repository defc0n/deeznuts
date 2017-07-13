$( function() {
    var socket = new WebSocket( "ws://104.131.190.72:3000/connect" );
    socket.onopen = function () {
	socket.onmessage = function ( msg ) {
	    var parsed = JSON.parse( msg.data );
	    startGame( socket, parsed.players );
	}
    }
});

function startGame ( socket, currentPlayers ) {
    var game = new Phaser.Game(
	800,
	600,
	Phaser.AUTO,
	'game-container',
	{ preload: preload, create: create, update: update }
    );

    var mapData = [['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'wall'],
['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall']];

    var cursors;

    var player;
    var player_id;
    var otherPlayers = {};
    var stars;

    function preload() {
	game.load.image( 'sky',  'sky.png' );
	game.load.image( 'star', 'star.png' );
	game.load.image( 'wall', 'wall.png' );
	game.load.spritesheet( 'dude', 'dude.png', 32, 48 );
    }

    function create() {

	//game.stage.disableVisibilityChange = true;

	//  We're going to be using physics, so enable the Arcade Physics system
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//  A simple background for our game
	game.add.sprite(0, 0, 'sky');

	//  The platforms group contains the ground and the 2 ledges we can jump on
	walls = game.add.group();

	//  We will enable physics for any object that is created in this group
	walls.enableBody = true;

	stars = game.add.group();
	stars.enableBody = true;

	for ( var i = 0; i < mapData.length; i++ ) {
	    for ( var j = 0; j < mapData[i].length; j++ ) {
		if ( !mapData[i][j] ) {
		    continue;
		}

		var gameObject = walls.create( j * 20, i * 20, mapData[i][j] );

		gameObject.body.immovable = true;
	    }
	}
	
	// The player and its settings
	player = game.add.sprite(32, game.world.height - 150, 'dude');

	//  We need to enable physics on the player
	game.physics.arcade.enable( player );

	player.body.collideWorldBounds = true;

	//  Our two animations, walking left and right.
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);

	cursors = game.input.keyboard.createCursorKeys();

	// Create the other players currently in the game.
	for ( var i = 0; i < currentPlayers.length; i++ ) {
	    var otherPlayer = currentPlayers[i];
	    otherPlayers[otherPlayer.id] = game.add.sprite(
		otherPlayer.x, otherPlayer.y, 'dude'
	    );
	    otherPlayers[otherPlayer.id].x = otherPlayer.x;
	    otherPlayers[otherPlayer.id].y = otherPlayer.y;
	    otherPlayers[otherPlayer.id].frame = otherPlayer.frame;
	}
    }

    function update() {
	socket.onmessage = function ( msg ) {
	    var update = JSON.parse( msg.data );	    

	    if ( update.goodbye ) {
		if ( otherPlayers[update.goodbye] ) {
		    otherPlayers[update.goodbye].kill();
		    delete otherPlayers[update.goodbye];
		}
	    }
	    else {
		if ( !otherPlayers[update.id] ) {
		    otherPlayers[update.id] = game.add.sprite(
			0, 0, 'dude'
		    );
		}		

		otherPlayers[update.id].x = update.x;
		otherPlayers[update.id].y = update.y;
		otherPlayers[update.id].frame  = update.frame;
	    }
	};

	var hitWall = game.physics.arcade.collide( player, walls );

	//  Reset the players velocity (movement)
	player.body.velocity.x = 0;
	player.body.velocity.y = 0;

	if (cursors.left.isDown) {
            //  Move to the left
            player.body.velocity.x = -150;
            player.animations.play('left');

	}
	else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = 150;
            player.animations.play('right');
	}
	else {
            //  Stand still
            player.animations.stop();
            player.frame = 4;
	}

	//  Allow the player to jump if they are touching the ground.
	//if (cursors.up.isDown && player.body.touching.down && hitPlatform ){
	if (cursors.up.isDown){
            player.body.velocity.y = -150;
	}
	if (cursors.down.isDown) {
	    player.body.velocity.y = 150;
	}

	var playerUpdate = {
	    x:     player.body.x,
	    y:     player.body.y,
	    frame: player.frame 
	};

	socket.send( JSON.stringify( playerUpdate ) );
    }
}
