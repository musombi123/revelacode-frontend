import os
import json

source_folder = "bible-books"   # 📁 Folder with individual JSON books
output_file = "kjv.json"        # 📦 Final joined file

bible_data = {}

for filename in os.listdir(source_folder):
    if filename.endswith(".json"):
        book_name = filename.replace(".json", "")
        file_path = os.path.join(source_folder, filename)

        with open(file_path, 'r', encoding='utf-8') as f:
            try:
                content = json.load(f)
                bible_data[book_name] = content
            except json.JSONDecodeError:
                print(f"❌ Error decoding {filename}")

# Save combined file
with open(output_file, 'w', encoding='utf-8') as out:
    json.dump(bible_data, out, indent=2)

print(f"✅ Merged {len(bible_data)} books into {output_file}")
