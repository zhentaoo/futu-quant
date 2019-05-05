#!/usr/bin/python
# coding:utf-8
import pandas as pd

json = {
    'foo': ['one', 'one', 'one', 'two', 'two', 'two'],
    'bar': ['A', 'B', 'C', 'A', 'B', 'C'],
    'baz': [1, 2, 3, 4, 5, 6],
    'zoo': ['x', 'y', 'z', 'q', 'w', 't']
}
data = pd.DataFrame(json)
print(json)
print(data)

json2 = data.pivot(index='foo', columns='bar', values='baz')
print(json2)

file = open('50ETF.json', 'w')
file.write(json2.to_json())
file.close()
