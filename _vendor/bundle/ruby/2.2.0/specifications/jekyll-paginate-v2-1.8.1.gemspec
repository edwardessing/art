# -*- encoding: utf-8 -*-
# stub: jekyll-paginate-v2 1.8.1 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-paginate-v2"
  s.version = "1.8.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Sverrir Sigmundarson"]
  s.date = "2017-07-24"
  s.description = "An enhanced zero-configuration in-place replacement for the now decomissioned built-in jekyll-paginate gem. This pagination gem offers full backwards compatability as well as a slew of new frequently requested features with minimal additional site and page configuration. Optional features include auto-generation of paginated collection, tag and category pages."
  s.email = ["jekyll@sverrirs.com"]
  s.homepage = "https://github.com/sverrirs/jekyll-paginate-v2"
  s.licenses = ["MIT"]
  s.required_ruby_version = Gem::Requirement.new(">= 2.0.0")
  s.rubygems_version = "2.5.0"
  s.summary = "Pagination Generator for Jekyll 3"

  s.installed_by_version = "2.5.0" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<jekyll>, ["~> 3.0"])
      s.add_development_dependency(%q<bundler>, ["~> 1.5"])
      s.add_development_dependency(%q<rake>, ["~> 10.4"])
      s.add_development_dependency(%q<minitest>, ["~> 5.4"])
    else
      s.add_dependency(%q<jekyll>, ["~> 3.0"])
      s.add_dependency(%q<bundler>, ["~> 1.5"])
      s.add_dependency(%q<rake>, ["~> 10.4"])
      s.add_dependency(%q<minitest>, ["~> 5.4"])
    end
  else
    s.add_dependency(%q<jekyll>, ["~> 3.0"])
    s.add_dependency(%q<bundler>, ["~> 1.5"])
    s.add_dependency(%q<rake>, ["~> 10.4"])
    s.add_dependency(%q<minitest>, ["~> 5.4"])
  end
end
