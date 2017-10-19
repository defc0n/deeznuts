%define perl_version 5.26.1
%define prefix       /opt/deeznuts/
%define perl_path    %{prefix}perl/
%define perl         %{perl_path}bin/perl

%define debug_package %{nil}

Name:           deeznuts-perl
Summary:        DeezNuts Perl
Version:        1.0
Release:        1%{?dist}
License:        GPL+ or Artistic
Group:          Development/Libraries
URL:            https://github.com/defc0n
Source0:        perl-%{perl_version}.tar.gz
Source1:        cpanfile
BuildRoot:      %{_tmppath}/%{name}-%{version}-%{release}-root-%(%{__id_u} -n)
AutoReqProv:    0
BuildRequires:  perl(App::cpanminus)

%description
Backend Perl & Libraries for DeezNuts.

%prep
%setup -q -n perl-%{perl_version}

%build
cp %{SOURCE1} .
/bin/sh Configure -des -Dprefix=%{perl_path} \
                       -Dman1dir=none \
                       -Dman3dir=none \
                       -Duserelocatableinc \
make

%install
make install DESTDIR=$RPM_BUILD_ROOT

# Install all application libraries into our built Perl.
%{buildroot}%{perl} /usr/bin/cpanm --notest --no-man-pages --installdeps .

# Strip the RPM build dir path inside all installed files recursively.
find %{buildroot}%{perl_path} -type f -print0 | \
    xargs -0 sed -i 's,%{buildroot}%{perl_path},%{perl_path},g'

# Generate a list of all files in MANIFEST to use in the %files section.
echo "%%defattr(-, root, root)" > /tmp/%{name}.MANIFEST
(cd $RPM_BUILD_ROOT; find . -type f -or -type l | sed -e s/^.// -e /^$/d) \
    >> /tmp/%{name}.MANIFEST

%{_fixperms} $RPM_BUILD_ROOT/*

%clean
rm -rf $RPM_BUILD_ROOT

%files -f /tmp/%{name}.MANIFEST
