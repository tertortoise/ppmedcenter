# Redux store

## scheduleGen

Type - Array of objects
generated in ApptEditor in CDM and sorted by doctordatetime ascending
shape of objects

```js
doctorId: 'string',// for ease of filtering in ApptEditor by doctorId
docDateTime: 'string', // 'd001 2018-10-05 16:20'
available: 'bool', // true if available, false if scheduled

```
## appts
Type - Array of objects
Generated in Dashboard
Sorted by date in descending order (newest above)

```js
docDateTime: 'string',// 'd001 2018-10-05 16:20'
doctorId: 'string',// for ease of filtering in ApptEditor by doctorId
docFullName: 'string',
speciality: 'string',
searchString: 'string', // fullname + speciality
dateTime: 'string', // for sorting purposes
date: 'string',
time: 'string',

```

# ApptEditor

## specialities

Type of object is Map

```js
key: 'string' //id of a speciality
value: {
  ageCategory: 'string',
  coeff: 'number',
  details: 'string',
  searchString: 'string', //title to lower case
  selected: 'bool', //true on selection
  title: 'string', //representation title of the speciality
  visible: 'bool', //false on search field filtering
}
```

## doctors

Type of object is Map

```js
key: 'string', //id of a doctor
value: {
  details: 'string', //expanded info on a doctor
  experience: 'string', //years of experience
  firstName: 'string',
  fullName: 'string', //composite
  middleName: 'string',
  priceCoeff: 'number', // pricing info
  picture: 'string', //url
  gender: 'string', // male or female for images
  searchString: 'string', //fullname to lowercase
  selected: 'bool',
  speciality: 'string', //id of speciality
  surname: 'string',
  visible: 'bool' //for filtering on search
}
```

## schedule

Type of object is Map
Generated from scheduleGen sorted by doctordatetime ascending

```js
key: 'string', // docDateTime 'd001 2018-10-05 16:20'
value: {
  doctorId: 'string',
  date: 'string', //generated for easy filtering and representation
  time: 'string', //generated for easy filtering and representation
  selected: 'bool',
  
}
```
On further rendering this should be transformed into arrays of objects and key should be added to the object
