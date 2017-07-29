import {Voronoi} from './Voronoi.js'



function getVoronoi (sites, bbox) {
   var voronoi = new Voronoi();
   var result = voronoi.compute(sites, bbox)

   var polygonList = new Array(result.cells.length)

   for (var i = 0; i < result.cells.length; i++)
      {
         var newPolygon = new Array()
         var siteId = result.cells[i].site.voronoiId
         for (var j = 0; j < result.cells[i].halfedges.length; j++) {
            const halfedge = result.cells[i].halfedges[j]

            var newVertex = (halfedge.edge.lSite.voronoiId == siteId) ? [Math.round(halfedge.edge.va.x), Math.round(halfedge.edge.va.y)] : [Math.round(halfedge.edge.vb.x), Math.round(halfedge.edge.vb.y)]

            newPolygon.push(newVertex)
         }

         var stringPolygon = ""
         for (var j = 0; j < newPolygon.length; j++) {

            stringPolygon += newPolygon[j][0].toString() + "," + newPolygon[j][1].toString() + " "
         }
         polygonList[i] = stringPolygon
      }


   return polygonList

}

export {getVoronoi};
