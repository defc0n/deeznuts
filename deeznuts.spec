Summary: DeezNuts
Name: deeznuts
Version: 0.1
Release: 1%{?dist}
License: GPL+ or Artistic
Group: Amusements/Games
URL: https://github.com/defc0n
Source0: DeezNuts-%{version}.tar.gz
BuildRoot: %{_tmppath}/%{name}-%{version}-%{release}-root-%(%{__id_u} -n)
AutoReqProv: 0
BuildRequires: perl
#BuildRequires: perl(ExtUtils::MakeMaker::CPANfile)

%description
DeezNuts

%prep
%setup -q -n DeezNuts-%{version}

%build
%{__perl} Makefile.PL PREFIX="%{buildroot}%{_prefix}"
make

%install
rm -rf $RPM_BUILD_ROOT
make pure_install

# clean up buildroot
find %{buildroot} -name .packlist -exec %{__rm} {} \;
%{_fixperms} $RPM_BUILD_ROOT/*

%clean
rm -rf $RPM_BUILD_ROOT/*

%files
