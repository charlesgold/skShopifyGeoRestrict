module.exports = function(grunt) {

	var cfg = {
		appBase: 'app'
		,distBase: 'dist'
		,appMain: 'app.htm'
		,distMain: 'app.htm'
		,banner: '/*!\n' +
		      ' * <%= pkg.name %>\n' +
		      ' * <%= pkg.title %>\n' +
		      ' * <%= pkg.url %>\n' +
		      ' * @author <%= pkg.author %>\n' +
		      ' * @version <%= pkg.version %>\n' +
		      ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
		      ' */\n'		

	}



	// Load the plugins
	//load-grunt-tasks instead of grunt.loadNpmTasks('grunt-contrib-concat');
	//https://www.npmjs.com/package/load-grunt-tasks
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
		cfg: {
			appBase: 'app'
			,distBase: 'dist'
			,appMain: 'app.htm'
			,distMain: 'app.htm'
			,banner: '/*!\n' +
			      ' * <%= pkg.name %>\n' +			      
			      ' * <%= pkg.repository.url %>\n' +
			      ' * @author <%= pkg.author %>\n' +
			      ' * @version <%= pkg.version %>\n' +
			      ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
			      ' */\n'
			,sassSrc: ''
			,appCss: ''
			,appJs: ''
			,distCss: ''
			,distJs: ''      		
		}
	    ,replace: {
	      dist: {
	        src: ['<%= cfg.distBase %>/<%= cfg.distMain =>']	        
	        ,overwrite: true,
	        ,replacements: [
		        {
					from: '{{ appjs }}'
					,to: 'app-min-<%= pkg.version %>-<%= grunt.template.today("yyyymmdd-hMMss") %>.js'
		        }
		        ,{
		        	from: '{{ appcss }}'
		        	,to: 'app-min-<%= pkg.version %>-<%= grunt.template.today("yyyymmdd-hMMss") %>.css'
		        }
	        ]
	      }
	      ,dev: {
	        src: ['<%= cfg.appBase %>/<%= cfg.appMain =>']	        
	        ,overwrite: true,
	        ,replacements: [
		        {
					from: '{{ appjs }}'
					,to: 'app-<%= pkg.version %>-<%= grunt.template.today("yyyymmdd-hMMss") %>.js'
		        }
		        ,{
		        	from: '{{ appcss }}'
		        	,to: 'app-<%= pkg.version %>-<%= grunt.template.today("yyyymmdd-hMMss") %>.css'
		        }
	        ]
	      }	      
	    }
	    ,concat: {
	      options: {
	          separator: ';'
	          ,banner: '/* <%=pkg.name %>-<%=pkg.version %> */'
	      }
	      ,dist: {
	          src: [
	            '<%= cfg.appBase %>/js/*.js'
	          ]
	          ,dest: '<%= cfg.distBase %>/app-min-<%= pkg.version %>-<%= grunt.template.today("yyyymmdd-hMMss") %>.js'
	      }
	      ,dev: {
	          src: [
	            '<%= cfg.appBase %>/js/*.js'
	          ]
	          ,dest: '<%= cfg.appBase %>/app-<%= pkg.version %>-<%= grunt.template.today("yyyymmdd-hMMss") %>.js'
	      } 	           
	    }//Concat
		,sass: {
		  dist: {        
		    options: {
		      style: 'compressed'
		      ,lineNumbers: true
		    } 
		    ,files: {
		      '<%= cfg.distBase =>/app-min-<%= pkg.version %>-<%= grunt.template.today("yyyymmdd-hMMss") %>.css' : '<%= cfg.appBase %>/sass/main.scss'
		    }       
		  },
		  dev: {
		    options: {
		      //style: 'compressed'
		    } 
		    ,files: {
		      '<%= cfg.appBase =>/app-<%= pkg.version %>-<%= grunt.template.today("yyyymmdd-hMMss") %>.css' : '<%= cfg.appBase %>/sass/main.scss'
		    }         
		  }
		     
		}
		,copy: {
		  dist: {
		      files: [
		          { //root htm file (template)
		            expand: true
		            ,cwd: '<%= cfg.appBase =>/'
		            ,src: ['<%= cfg.appMain =>']
		            ,dest: '<%= cfg.distBase =>/'
		            ,flatten: true
		            ,filter: 'isFile'
		          }
		      ]
		  }
		}			    	    		
		,uglify: {
		  
		    dist : {
				options: {
				  mangle: true				  
				  ,footer: ''
				}		    	
				,files : {
					'<%= cfg.distBase %>/app-ug-<%= pkg.version %>-<%= grunt.template.today("yyyymmdd-hMMss") %>.js' : ['<%= cfg.distBase %>/app-min-<%= pkg.version %>-<%= grunt.template.today("yyyymmdd-hMMss") %>.js']
				}
		    }
		  
		} 

	});

	// Default task(s).
	grunt.registerTask('dist', ['clean:dist','copy:dist','replace:dist','concat:dist', "sass:dist"]);  

};