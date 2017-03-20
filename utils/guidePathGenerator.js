class PathGenerator {
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || '';
  }

  generate(guideFilePath) {
    let suffixIndex = guideFilePath.lastIndexOf('.md');
    if (suffixIndex < 0) {
      suffixIndex = guideFilePath.length;
    }

    return `${this.baseUrl}${guideFilePath.slice(0, suffixIndex)}/`;
  }
}

module.exports = PathGenerator;
