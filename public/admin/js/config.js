require.config({
  baseUrl: '/admin/',
  paths: {
    'template': 'lib/artTemplate/template-web',
    'bootstrap': 'lib/bootstrap/js/bootstrap',
    'bootstrapPaginator': 'lib/bootstrap-paginator/bootstrap-paginator',
    'bootstrapValidator': 'lib/bootstrap-validator/js/bootstrapValidator',
    'echarts': 'lib/echarts/echarts.min',
    'jquery': 'lib/jquery/jquery',
    'jqueryFileupload': 'lib/jquery-fileupload/jquery.fileupload',
    'nprogress': 'lib/nprogress/nprogress',
    'common': 'js/common',
    'jquery-ui/ui/widget': 'lib/jquery-fileupload/jquery.ui.widget'
  },
  shim: {
    'bootstrap': {
      deps: ['jquery']
    },
    'bootstrapPaginator': {
      deps: ['bootstrap'],
    },
    'bootstrapValidator': {
      deps: ['bootstrap']
    }
  }
});