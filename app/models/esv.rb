# class Esv < ApplicationRecord

# #!/usr/bin/env python

# import sys
# import requests

# passages = """
# Genesis 6: 5
# Ephesians 2: 1 - 5
# """

# API_KEY = '045a1c269f62db1773dcb4849baf375f7010b0ce'
# API_URL = 'https://api.esv.org/v3/passage/text/'


# def get_esv_text(passage, numbers)
# params = {
#     'q': passage,
#     'include-headings': False,
#     'include-footnotes': False,
#     'include-verse-numbers': numbers,
#     'include-short-copyright': False,
#     'include-passage-references': True
# }

# headers = {
#     'Authorization': 'Token %s' % API_KEY
# }

# response = requests.get(API_URL, params = params, headers = headers)

# passages = response.json()['passages']

# return passages[0].strip() if passages else 'Error: Passage not found'

# for p in passages.strip().split('\n'):
#     numbers = ('-' in p)
# scripture = get_esv_text(p, numbers).replace('[', '').replace(']', '').replace('–', '-').replace('\n\n  ', ':  ')
# print(scripture)

# end