requires 'bareword::filehandles';
requires 'Games::Dice::Loaded';
requires 'indirect';
requires 'JavaScript::Minifier::XS';
requires 'Mojolicious::Lite';
requires 'Mojolicious::Plugin::AssetPack';
requires 'Moo';
requires 'Moose';
requires 'multidimensional';
requires 'Statistics::Distribution::Generator';
requires 'strictures';

on build => sub {
   requires 'ExtUtils::MakeMaker::CPANfile';
   requires 'File::ShareDir::Install';
};