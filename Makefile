name     = deeznuts-perl
specfile = $(name).spec
files    = cpanfile

rpm:
	cp $(files) $(HOME)/rpmbuild/SOURCES
	rpmbuild -bb $(specfile)
