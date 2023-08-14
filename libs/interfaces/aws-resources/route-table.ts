import IRouteTableRoute from './route-table-route';

export default interface IRouteTable {
  resourceName: string;
  resourceType: string;
  routeTableId: string;
  routes: Array<IRouteTableRoute>;
}
