import json
import os

merged_bible = {}

for file in os.listdir():
    if file.endswith(".json") and file != "Books.json":
        book = file.replace(".json", "")
        with open(file, "r", encoding="utf-8") as f:
            data = json.load(f)
            merged_bible[book] = {}
            for key, verse_text in data.items():
                # Expecting key like "Genesis 1:1"
                try:
                    parts = key.split()
                    chapter_verse = parts[1].split(":")
                    chapter = chapter_verse[0]
                    verse_num = chapter_verse[1]
                    if chapter not in merged_bible[book]:
                        merged_bible[book][chapter] = {}
                    merged_bible[book][chapter][verse_num] = verse_text
                except Exception as e:
                    print(f"⚠️ Error parsing key '{key}' in file '{file}': {e}")

with open("kjv.json", "w", encoding="utf-8") as out_file:
    json.dump(merged_bible, out_file, indent=2)

print("✅ Successfully merged into kjv.json")
