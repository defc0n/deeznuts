package FishServe::Util;

use strictures 2;
require Exporter;

@ISA       = qw( Exporter );
@EXPORT_OK = qw( distance );

sub distance {
    my ( $x1, $y1, $x2, $y2 ) = @_;

    sqrt(
	( $x2 - $x2 ) ** 2 + ( $y2 - $y1 ) ** 2
    );
}

1;
