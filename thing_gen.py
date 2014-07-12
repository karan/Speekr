#!/usr/bin/env python
#coding: utf8 

en = {
  'word_col': "cat dog apple mine your modification improvement aerial",
  'sentence_col': ("An air well or aerial well is a structure or device that "
                 "collects water by promoting the condensation of moisture "
                 "from air.Because this measurement was used to calibrate other"
                 " distances in astronomy, the result effectively doubled the "
                 "estimated size of the universe.If you show people the "
                 "problems and you show people the solutions they will be "
                 "moved to act.At the 2006 census, its existence was noted, "
                 "but its population was not reported.It was listed for its "
                 "potential to yield information in the future, and includes "
                 "one contributing site with approximately 600 items.")
}
es = {
  'word_col': "gato mío manzana perro su mejora modificación perro aerialcat manzana mina su mejora modificación aérea",
  'sentence_col': ("Un pozo de aire o bien aérea es una estructura o un dispositivo que " 
                 "recoge el agua mediante la promoción de la condensación de la humedad " 
                 "de air.Because se utiliza esta medida para calibrar otro "
                 "Distancias en astronomía, el resultado efectivamente duplicó el "
                 "El tamaño estimado del universo.Si muestra la gente "
                 "Los problemas y mostrarle a la gente las soluciones van a ser "
                 "movido a act.At el censo de 2006, se tomó nota de su existencia "
                 "pero su población no era reported.It fue catalogado por su "
                 "El potencial para producir información en el futuro, e incluye "
                 "un sitio que contribuye con aproximadamente 600 artículos.")
}
zh = {
  'word_col': "猫 狗 苹果 矿 井您 的 修改 完善 航 空",
  'sentence_col': ("空气好或空中井是一个结构或设备"
                 "收集的水通过促进水分的凝结"
                 "从空气中.由于这种测量用于校准其它"
                 "在天文学的距离，结果有效地增加了一倍的"
                 "估计宇宙的大小.如果你向人们展示了"
                 "的问题，你向人们展示的解决方案，他们将"
                 "感动行事.在2006年的人口普查，它的存在注意到，"
                 "但没有报告其人口，它没有被列为其"
                 "势，以产生在未来的信息，并且包括"
                 "一个网站贡献约600项.")
}

template = """new Thing({
    thingType: '{{type}}',
    lang: '{{lang}}',
    thing: '{{thing}}'
  }).save(function(err, n) {});"""


# words = en['word_col'].split(" ")
# for word in words:
#   print template.replace("{{type}}", "word").replace("{{lang}}", "en").replace("{{thing}}", word)

# words = es['word_col'].split(" ")
# for word in words:
#   print template.replace("{{type}}", "word").replace("{{lang}}", "es").replace("{{thing}}", word)

# words = zh['word_col'].split(" ")
# for word in words:
#   print template.replace("{{type}}", "word").replace("{{lang}}", "zh").replace("{{thing}}", word)

words = en['sentence_col'].split(".")
for word in words:
  print template.replace("{{type}}", "sentence").replace("{{lang}}", "en").replace("{{thing}}", word)

words = es['sentence_col'].split(".")
for word in words:
  print template.replace("{{type}}", "sentence").replace("{{lang}}", "es").replace("{{thing}}", word)

words = zh['sentence_col'].split(".")
for word in words:
  print template.replace("{{type}}", "sentence").replace("{{lang}}", "zh").replace("{{thing}}", word)
