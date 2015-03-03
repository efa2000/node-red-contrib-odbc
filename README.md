# node-red-contrib-odbc
Node for Node-RED to unixODBC and its supported drivers.
Based on node-odbc https://github.com/wankdanker/node-odbc 

Requirements
------------

* unixODBC binaries and development libraries for module compilation
  * on Ubuntu/Debian `sudo apt-get install unixodbc unixodbc-dev`
  * on OSX using macports.org `sudo port unixODBC`
* odbc drivers for target database
* properly configured odbc.ini and odbcinst.ini.

Expample of odbcinst.ini

		[PostgreSQL]
		Description=ODBC for PostgreSQL
		Driver=/usr/lib/psqlodbc.so
		Setup=/usr/lib/libodbcpsqlS.so
		FileUsage=1

		[MySQL]
		Description=ODBC for MySQL
		Driver=/usr/lib/libmyodbc5.so
		Setup=/usr/lib/libodbcmyS.so
		FileUsage=1

		[FreeTDS]
		Description=ODBC for MS SQL
		Driver=/usr/lib64/libtdsodbc.so.0

		[MSSQL]
		Description=Microsoft ODBC Driver 11 for SQL Server
		Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-11.0.so.2270.0
		Threading=1
		UsageCount=1

Install
-------

After insuring that all requirements are installed run the following command in the root directory of your Node-RED install


		npm install node-red-contrib-odbc

Configure node
-------

####Connection string

[![Config](https://raw.githubusercontent.com/efa2000/node-red-contrib-odbc/master/Config_CN.png)](https://raw.githubusercontent.com/efa2000/node-red-contrib-odbc/master/Config_CN.png)

####Query

[![Config](https://raw.githubusercontent.com/efa2000/node-red-contrib-odbc/master/query.png)](https://raw.githubusercontent.com/efa2000/node-red-contrib-odbc/master/query.png)

You can uses the mustache format.
