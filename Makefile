name = deeznuts-perl
version = 1.0
specfile = $(name).spec
tarball = $(name)-$(version).tar.gz
files = $(specfile) cpanfile inc/cpanm inc/perl-build

rpm:
	tar zcf $(tarball) --transform 's,^,$(name)-$(version)/,' $(files)
	rpmbuild -ta $(tarball)
