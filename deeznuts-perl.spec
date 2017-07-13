%define perl_version 5.26.0
%define prefix /opt/deeznuts/
%define perl_path %{prefix}perl/
%define perl %{perl_path}bin/perl

Name:           deeznuts-perl
Summary:        DeezNuts Perl
Version:        1.0
Release:        1%{?dist}
License:        GPL+ or Artistic
Group:          Development/Libraries
URL:            https://github.com/defc0n
Source0:        %{name}-%{version}.tar.gz
BuildRoot:      %{_tmppath}/%{name}-%{version}-%{release}-root-%(%{__id_u} -n)
AutoReqProv:    0
BuildRequires:  perl

%description
Backend Perl & Libraries for DeezNuts.

%prep
%setup

%build

%install
PERL_BUILD_INSTALL_OPTIONS="DESTDIR=$RPM_BUILD_ROOT" inc/perl-build --noman \
    %{perl_version} %{perl_path}

# https://github.com/miyagawa/cpanminus/issues/396#issuecomment-54322877
export PERL5LIB=$( %{buildroot}%{perl} -MConfig -e \
    'print $Config{privlibexp};' ):$PERL5LIB
export PERL5LIB=%{buildroot}/$( %{buildroot}%{perl} -MConfig -e \
    'print $Config{privlibexp};' ):$PERL5LIB
export PERL5LIB=%{buildroot}/$( %{buildroot}%{perl} -MConfig -e \
    'print $Config{vendorlibexp};' ):$PERL5LIB
export PERL5LIB=%{buildroot}/$( %{buildroot}%{perl} -MConfig -e \
    'print $Config{sitelibexp};' ):$PERL5LIB

export PERL_MB_OPT="--installdirs site --destdir $RPM_BUILD_ROOT"
export DESTDIR=$RPM_BUILD_ROOT
export PERL_MM_OPT="INSTALLDIRS=site DESTDIR=$RPM_BUILD_ROOT"

%{buildroot}%{perl} inc/cpanm --notest --no-man-pages --installdeps .

# Strip the RPM build dir path inside all installed files recursively.
find %{buildroot}%{perl_path} -type f -print0 | \
    xargs -0 sed -i 's,%{buildroot}%{perl_path},%{perl_path},g'

# Generate a list of all files in MANIFEST to use in the %files section.
echo "%%defattr(-, root, root)" > MANIFEST
(cd %{buildroot}; find . -type f -or -type l | sed -e s/^.// -e /^$/d) \
    >> MANIFEST

%{_fixperms} $RPM_BUILD_ROOT/*

%clean
rm -rf $RPM_BUILD_ROOT

%files -f MANIFEST
%defattr(-,root,root)
