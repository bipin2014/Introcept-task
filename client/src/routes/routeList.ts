import ClientLayout from '../modules/views/Client';


let routeList: {
  path: string;
  component: any;
  exact: boolean;
}[];

routeList = [
  {
    path: '/',
    exact: true,
    component: ClientLayout,
  },
  {
    path: '/client/:id',
    exact: true,
    component: ClientLayout,
  },
];

export default routeList;
