import IRouteTableRoute from './route-table-route';

export default interface IRouteTable {
  RouteTableId: string;
  Routes: Array<IRouteTableRoute>;
}
