from deep_translator import GoogleTranslator


def transl(text, to_lang):
    translated = GoogleTranslator(source='auto', target=to_lang).translate(text)
    return translated
