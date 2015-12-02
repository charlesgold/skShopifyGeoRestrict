#Shopify - Block Country Visit#
JS plugin to be used to block visits from countries *not* listed. The plugin is definitely not bulletproof, but a quick to to combat fraud.

##Installation##
* npm install
* bower install

##Setup##
To add/remove country codes be sure to edit:

```javascript
cstShopifyGeoApp.settings.db = [];
```

* Redirect URL is Base64 encoded

##Grunt Commands##
* `grunt` dist
* `grunt` dev

##Dependecies##
* Requires JQuery

##Notes##
* [http://dev.maxmind.com/geoip/legacy/codes/iso3166/](ISO 3166 Country Codes)
* Uses [http://freegeoip.net](freegeoip.net)


#Contact#
* Email: charlietopjian@gmail.com
* Github: [http://github.com/ctopjian](http://github.com/ctopjian)

#Resources#
* [https://docs.npmjs.com/cli/install](NPM install options)