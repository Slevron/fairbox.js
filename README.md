# Fairbox.js
----------

## Download ##

**Bower**

    $ bower install fairbox.js --save

**Npm**

    $ npm install fairbox.js --save

----------
## Getting Started ##
- **Installation**
 - **Include the CSS in your <head> tag :**

		    <link href="path/to/fairbox.css rel="stylesheet">

 - **Include the JS after your </body> tag in the bottom :**

		    <script src="path/to/fairbox.js></script>

- **Don't forget to load jQuery !**

----------
**Initialize with html**

 - **Add a `data-fairbox` on your tag `<img>` tag:** 
 

	    <img src="images1" data-fairbox />

 - **Youtube video add  `data-youtube` and put your Youtube_ID video:** 
	 

	 - www.youtube.com/watch?v="**Youtube_ID**"

		    <img src="images1" data-fairbox data-youtube="Youtube_ID" />

----------
## Options ##

**You can change option** 

	    FairBox.option({
			'disablePreview' : true,
			'disableSlider' : true
		})

| Option              | Default        | Description                                                    |
| ------------------- |:-------------: | --------------------------------------------------------------:|
| disablePreview      | false          | preview menu with miniature of your image in the popup |
| disableSlider       | false          | switch next image or previous image                        |

----------
## Licence ##

MIT Licence

