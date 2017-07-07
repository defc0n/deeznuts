name = deeznuts-perl
version = 1.0
specfile = $(name).spec
rpmbuild_sources = ~/rpmbuild/SOURCES
tarball = $(name)-$(version).tar.gz
files = cpanfile inc/cpanm inc/perl-build inc/patch-path

rpm:
	tar zcf $(tarball) --transform 's,^,$(name)-$(version)/,' $(files)
	cp $(tarball) $(rpmbuild_sources)
	rpmbuild -bb $(specfile)
