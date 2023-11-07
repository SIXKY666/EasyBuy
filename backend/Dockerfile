#### Build App
FROM node:16

# Install required apps
RUN apt-get update && \
    apt-get -y install --no-install-recommends \
    tzdata locales && \
    rm -rf /var/lib/apt/lists/*

# Set time zone
ENV TZ=Asia/Bangkok
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata

# Set the locale
RUN sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale LANG=en_US.UTF-8
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US.UTF-8

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install
COPY ./ ./

# Expose the port the app runs in
EXPOSE 5000

# Serve the app
CMD ["yarn", "start"]

