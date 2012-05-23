.PHONY: clean

SRCS = src/header.js                 \
       src/namespace.js              \
       src/ObjectSet.js

build: $(LIBS) $(SRCS)
	mkdir -p build
	cat $(SRCS) >build/hormigas.js
	jsmin <build/hormigas.js >build/hormigas-tmp.js
	cat src/header.js build/hormigas-tmp.js >build/hormigas-min.js
	rm build/hormigas-tmp.js

clean:
	rm -rf build
