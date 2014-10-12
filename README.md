JS Dynamic-Background
=========

Ce projet s'inspire des fond d'écran dynamique iOS, et permet d'insérer dans canvas HTML5 des "bulles" qui se déplacent et rebondissent sur les bords de l'écran.

Le projet fonctionne sur mobile et répond aux mouvements de l'accéléromètre.



Demo
----------

Vous pouvez le voir en action sur http://codelapse.fr

![demo](http://s28.postimg.org/45861u3t9/Capture_d_cran_2014_10_12_14_22_54.png)



Utilisation
----------

Il faut commencer par inclure les fichiers JS du projet :

```javascript
<script src="scripts/dynamicBackground.js"></script>
<script src="scripts/framerate.js"></script>
<script src="scripts/particule.js"></script>
<script src="scripts/vector.js"></script>
<script src="scripts/accelerometer.js"></script>
```

Ajouter un canvas avec un id du nom que vous souhaitez :
```html
<canvas id="dynamic-background"></canvas>
```

Créer un nouvel objet DynamicBackground avec le nom du canvas à utiliser :
```javascript
<script type="text/javascript">
	new DynamicBackground('#dynamic-background');
</script>
```


License d'utilisation
-------------------
[MIT License](https://github.com/codelapse/js-dynamic-background/blob/master/README.md)