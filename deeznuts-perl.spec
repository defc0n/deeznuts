%define perl_version 5.26.0
%define prefix       /opt/deeznuts/
%define perl_path    %{prefix}perl/
%define perl         %{perl_path}bin/perl

%define archname    x86_64-linux
%define archlibexp  %{perl_path}lib/%{perl_version}/%{archname}
%define privlibexp  %{perl_path}lib/%{perl_version}
%define sitearchexp %{perl_path}lib/site_perl/%{perl_version}/%{archname}
%define sitelibexp  %{perl_path}lib/site_perl/%{perl_version}

Name:           deeznuts-perl
Summary:        DeezNuts Perl
Version:        1.0
Release:        1%{?dist}
License:        GPL+ or Artistic
Group:          Development/Libraries
URL:            https://github.com/defc0n
Source0:        perl-%{perl_version}.tar.gz
Source1:        %{name}-%{version}.tar.gz
BuildRoot:      %{_tmppath}/%{name}-%{version}-%{release}-root-%(%{__id_u} -n)
AutoReqProv:    0
BuildRequires:  perl(App::cpanminus)

%description
Backend Perl & Libraries for DeezNuts.

%prep
%setup -T -D -a 1
%setup -q -n perl-%{perl_version}


%build
/bin/sh Configure -des -Dprefix=%{perl_path} -Dman1dir=none -Dman3dir=none
make

%install
make install DESTDIR=$RPM_BUILD_ROOT

export PERL5LIB=$RPM_BUILD_ROOT/%{archlibexp}:$PERL5LIB
export PERL5LIB=$RPM_BUILD_ROOT/%{privlibexp}:$PERL5LIB
export PERL5LIB=$RPM_BUILD_ROOT/%{sitearchexp}:$PERL5LIB
export PERL5LIB=$RPM_BUILD_ROOT/%{sitelibexp}:$PERL5LIB

export PERL_MB_OPT="--installdirs site --destdir $RPM_BUILD_ROOT"
export DESTDIR=$RPM_BUILD_ROOT
export PERL_MM_OPT="INSTALLDIRS=site DESTDIR=$RPM_BUILD_ROOT"

%{buildroot}%{perl} /usr/bin/cpanm --notest --no-man-pages --installdeps \
  ../%{name}-%{version}
#%{buildroot}%{perl} /usr/bin/cpanm --notest --no-man-pages Mojolicious

# Generate a list of all files in MANIFEST to use in the %files section.
echo "%%defattr(-, root, root)" > /tmp/%{name}.MANIFEST
(cd $RPM_BUILD_ROOT; find . -type f -or -type l | sed -e s/^.// -e /^$/d) \
    >> /tmp/%{name}.MANIFEST

%{_fixperms} $RPM_BUILD_ROOT/*

%clean
rm -rf $RPM_BUILD_ROOT

%files -f /tmp/%{name}.MANIFEST
