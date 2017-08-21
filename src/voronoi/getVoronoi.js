import {Voronoi} from './Voronoi.js'


console.log("executing voronoi algforithm")
function getVoronoi (sites, bbox) {
   var voronoi = new Voronoi();
   var result = voronoi.compute(sites, bbox)

   var polygonList = new Array(result.cells.length)

   var indexConvert = []
   for (var i = 0; i < result.cells.length; i++) {
      for (var j = 0; j < sites.length; j++) {
         if (sites[j].x == result.cells[i].site.x && sites[j].y == result.cells[i].site.y) {
            indexConvert.push(j)
         }
      }

   }



   for (var i = 0; i < result.cells.length; i++)
      {
         var newPolygon = new Array()
         var siteId = result.cells[i].site.voronoiId
         for (var j = 0; j < result.cells[i].halfedges.length; j++) {
            const halfedge = result.cells[i].halfedges[j]

            var newVertex = (halfedge.edge.lSite.voronoiId == siteId) ? [Math.round(halfedge.edge.va.x), Math.round(halfedge.edge.va.y)] : [Math.round(halfedge.edge.vb.x), Math.round(halfedge.edge.vb.y)]

            newPolygon.push(newVertex)
         }

         polygonList[indexConvert[i]] = newPolygon
      }


   return polygonList

}

export {getVoronoi};
