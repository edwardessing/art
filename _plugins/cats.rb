module Jekyll
  class CatsGenerator < Generator
    def generate(site)
      cats = []
      for ent in Dir.entries("assets/selected")
        name = File.basename(ent, File.extname(ent))
        if name[0] == "."
          next
        end
        cat = {
          "name" => name,
          "path" => "selected/" + ent}
        cats << cat
      end
      cats.sort! { | a, b | a["name"] <=> b["name"] }

      site.data['selected'] = cats
    end
  end
end