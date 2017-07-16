requires 'JavaScript::Minifier::XS';
requires 'Mojolicious::Lite';
requires 'Mojolicious::Plugin::AssetPack';
requires 'Moo';

on build => sub {
   requires 'ExtUtils::MakeMaker::CPANfile';
   requires 'File::ShareDir::Install';
};