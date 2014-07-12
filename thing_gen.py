#!/usr/bin/env python
#coding: utf8 

en = {
  'word_col': "encyclopedia destination peninsulas passenger automobile  modification improvement aerial population racketeer",
  'sentence_col': ("This is a book."
                   "That is not a pencil."
                   "One is strong. The other is weak."
                   "What he said is something."
                   "All you have to do is add the letters."
                   "That is exactly what we want to learn."
                   "It is seven. It must be seven."
                   "I’m very fond to you as a friend."
                   "I’m glad to hear your good news."
                   "Today we are going to hear report.")
}
es = {
  'word_col': "enciclopedia destino penínsulas pasajeros automóvil modificación mejora Antena población mafioso",
  'sentence_col': ("Cómo te llamas."
                   "Cuántos años tiene usted?."
                   "Hablas inglés."
                   "Entiende usted."
                   "Puede ayudarme."
                   "Tengo que ir ahora."
                   "Te amo."
                   "Te toca a ti.")
}
zh = {
  'word_col': "百科全书 目的地 半岛 客运 汽车 改装 改进 航空 人口 敲诈勒索",
  'sentence_col': ("你吃饭了吗？."
                   "我跟你讲。."
                   "请问一下。."
                   "我敬你一杯。."
                   "我会考虑一下的。."
                   "你去忙你的吧。."
                   "我不是说你。."
                   "你吓死我了。."
                   "你辛苦了。."
                   "可不是吗？."
                   "哪儿跟哪儿？."
                   "看情况。."
                   "爱谁谁！.")
}
fr = {
  'word_col': "encyclopédie destination péninsules passagers automobile modification amélioration aérien population racketteur",
  'sentence_col': ("Ça ne me plaît pas."
                   "Je vous en prie."
                   "Comment vous appelez-vous."
                   "Tu parles anglais?."
                   "Je ne parle pas espagnol."
                   "Pouvez-vous m'aider?."
                   "Tu m'as tellement manqué."
                   "Allez tout droit! Puis prennez à gauche."
                   "Un moment s'il vous plaît.")
}

template = """new Thing({
    thingType: "{{type}}",
    lang: "{{lang}}",
    thing: "{{thing}}"
  }).save(function(err, n) {});"""


print "var Thing = require('mongoose').model('Thing');"

words = en['word_col'].split(" ")
for word in words:
  print template.replace("{{type}}", "1").replace("{{lang}}", "en").replace("{{thing}}", word)

words = es['word_col'].split(" ")
for word in words:
  print template.replace("{{type}}", "1").replace("{{lang}}", "es").replace("{{thing}}", word)

words = zh['word_col'].split(" ")
for word in words:
  print template.replace("{{type}}", "1").replace("{{lang}}", "zh").replace("{{thing}}", word)

words = fr['word_col'].split(" ")
for word in words:
  print template.replace("{{type}}", "1").replace("{{lang}}", "fr").replace("{{thing}}", word)

words = en['sentence_col'].split(".")
for word in words:
  print template.replace("{{type}}", "2").replace("{{lang}}", "en").replace("{{thing}}", word)

words = es['sentence_col'].split(".")
for word in words:
  print template.replace("{{type}}", "2").replace("{{lang}}", "es").replace("{{thing}}", word)

words = zh['sentence_col'].split(".")
for word in words:
  print template.replace("{{type}}", "2").replace("{{lang}}", "zh").replace("{{thing}}", word)

words = fr['sentence_col'].split(".")
for word in words:
  print template.replace("{{type}}", "2").replace("{{lang}}", "fr").replace("{{thing}}", word)
