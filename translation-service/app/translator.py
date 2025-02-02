from googletrans import Translator

translator = Translator()

def translate_text(text, dest, src):
    try:
        result = translator.translate(text, dest=dest, src=src)
        return result.text
    except Exception as e:
        raise e 