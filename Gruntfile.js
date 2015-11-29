module.exports = function(grunt) {





	// Load the plugins
	//load-grunt-tasks instead of grunt.loadNpmTasks('grunt-contrib-concat');
	//https://www.npmjs.com/package/load-grunt-tasks
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
		,cfg: {
			appBase: 'app'
			,distBase: 'dist'
			,appTemplate: 'template.htm'
			,appMain: 'app.htm'
			,distMain: 'app.htm'
			,banner: '/*!\n' +
			      ' * <%= pkg.name %>\n' +			      
			      ' * <%= pkg.repository.url %>\n' +
			      ' * @author <%= pkg.author %>\n' +
			      ' * @version <%= pkg.version %>\n' +
			      ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
			      ' */\n'
			,sassSrc: 'sass/main.scss'
			,appCss: 'app-<%= pkg.version %>-<%= grunt.template.today("yyyymmdd-hMM") %>.css'
			,appJs: 'app-<%= pkg.version %>-<%= grunt.template.today("yyyymmdd-hMM") %>.js'
			,distCss: 'app-min-<%= pkg.version %>-<%= grunt.template.today("yyyymmdd-hMM") %>.css'
			,distJs: 'app-min-<%= pkg.version %>-<%= grunt.template.today("yyyymmdd-hMM") %>.js'
			,distJsUglify: 'app-ug-<%= pkg.version %>-<%= grunt.template.today("yyyymmdd-hMM") %>.js'      		
		}
	    ,replace: {
	      dist: {
	      	src: ['<%= cfg.appBase %>/<%= cfg.appTemplate %>']
	        ,dest: ['<%= cfg.distBase %>/<%= cfg.distMain %>']	        
	        //,overwrite: true
	        ,replacements: [
		        {
					from: '{{ appjs }}'
					,to: '<%= cfg.distCss %>'
		        }
		        ,{
		        	from: '{{ appcss }}'
		        	,to: '<%= cfg.distJs %>'
		        }
	        ]
	      }
	      ,dev: {
	      	src: ['<%= cfg.appBase %>/<%= cfg.appTemplate %>']
	        ,dest: ['<%= cfg.appBase %>/<%= cfg.appMain %>']	        
	        //,overwrite: true
	        ,replacements: [
		        {
					from: '{{ appjs }}'
					,to: '<%= cfg.appJs %>'
		        }
		        ,{
		        	from: '{{ appcss }}'
		        	,to: '<%= cfg.appCss %>'
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
	          ,dest: '<%= cfg.distBase %>/<%= cfg.distJs %>'
	      }
	      ,dev: {
	          src: [
	            '<%= cfg.appBase %>/js/*.js'
	          ]
	          ,dest: '<%= cfg.appBase %>/<%= cfg.appJs %>'
	      } 	           
	    }//Concat
		,sass: {
		  dist: {        
		    options: {
		      style: 'compressed'
		      ,lineNumbers: true
		    } 
		    ,files: {
		      '<%= cfg.distBase %>/<%= cfg.distCss %>' : '<%= cfg.appBase %>/<%= cfg.sassSrc %>'
		    }       
		  },
		  dev: {
		    options: {
		      //style: 'compressed'
		    } 
		    ,files: {
		      '<%= cfg.appBase %>/<%= cfg.appCss %>' : '<%= cfg.appBase %>/<%= cfg.sassSrc %>'
		    }         
		  }
		     
		}
		/** not used
		,copy: {
		  dist: {
		      files: [
		          { //root htm file (template)
		            expand: true
		            ,cwd: '<%= cfg.appBase %>/'
		            ,src: ['<%= cfg.appMain %>']
		            ,dest: '<%= cfg.distBase %>/'
		            ,flatten: true
		            ,filter: 'isFile'
		          }
		      ]
		  }		  
		}
		*/			    	    		
		,uglify: {
		  
		    dist : {
				options: {
				  mangle: true				  
				  ,footer: ''
				}		    	
				,files : {
					'<%= cfg.distBase %>/<%= cfg.distJsUglify %>' : ['<%= cfg.distBase %>/<%= cfg.distJs %>']
				}
		    }
		  
		}
	    ,clean: {
	      dist: ['dist']
	      ,dev: ['<%= cfg.appBase %>/*.js','<%= cfg.appBase %>/*.css','<%= cfg.appBase %>/*.map','<%= cfg.appMain %>']
	    }
		,watch: {
			app: {
			  files: ['<%= cfg.appBase %>/js/*.js', '<%= cfg.appBase %>/<%= cfg.sassSrc %>', '<%= cfg.appBase %>/<%= cfg.appMain %>'],
			  tasks: ['default'],
			}
		}	      		 

	});

	// Default task(s).
	grunt.registerTask('dev', ['clean:dev','concat:dev','sass:dev','replace:dev']);  
	grunt.registerTask('dist', ['clean:dist','concat:dist','uglify:dist','sass:dist','replace:dist']);	

};