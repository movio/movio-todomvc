Error.stackTraceLimit = Infinity;

const testContext = require.context(
  './src', true, /\.test\.tsx?/
);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

const modules = requireAll(testContext); // eslint-disable-line no-unused-vars
