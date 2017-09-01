name = deeznuts-perl
version = 1.0
specfile = $(name).spec
tarball = $(name)-$(version).tar.gz
files = cpanfile

rpm:
	tar zcf $(tarball) --transform 's,^,$(name)-$(version)/,' $(files)
	cp $(tarball) $(HOME)/rpmbuild/SOURCES
	rpmbuild -bb $(specfile)
