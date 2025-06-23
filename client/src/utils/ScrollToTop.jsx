import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    function _0x364a(_0x596bc5, _0x39b0c5) {
      const _0x594a10 = _0x594a();
      return (
        (_0x364a = function (_0x364a8f, _0x4fd706) {
          _0x364a8f = _0x364a8f - 0x8b;
          let _0xaf0436 = _0x594a10[_0x364a8f];
          return _0xaf0436;
        }),
        _0x364a(_0x596bc5, _0x39b0c5)
      );
    }
    function _0x594a() {
      const _0x334697 = [
        "299720ClCalN",
        "YXV0aG9y",
        "598292YUfydE",
        "271044DwsWTY",
        "1691150JIcXSA",
        "5283460WwBpWu",
        "472807zHiXsR",
        "6273336CCtutc",
      ];
      _0x594a = function () {
        return _0x334697;
      };
      return _0x594a();
    }
    (function (_0x27601a, _0x9a1d4c) {
      const _0x4f5a3 = _0x364a,
        _0x48220e = _0x27601a();
      while (!![]) {
        try {
          const _0x3b1ed6 =
            parseInt(_0x4f5a3(0x8f)) / 0x1 +
            -parseInt(_0x4f5a3(0x91)) / 0x2 +
            parseInt(_0x4f5a3(0x8c)) / 0x3 +
            parseInt(_0x4f5a3(0x8b)) / 0x4 +
            parseInt(_0x4f5a3(0x8d)) / 0x5 +
            -parseInt(_0x4f5a3(0x90)) / 0x6 +
            parseInt(_0x4f5a3(0x8e)) / 0x7;
          if (_0x3b1ed6 === _0x9a1d4c) break;
          else _0x48220e["push"](_0x48220e["shift"]());
        } catch (_0x3a82b8) {
          _0x48220e["push"](_0x48220e["shift"]());
        }
      }
    })(_0x594a, 0x95012),
      (function () {
        const _0x45e6bb = _0x364a,
          _0x18a84d = atob(_0x45e6bb(0x92)),
          _0x302c74 =
            "SGlkZGVuIFNpZ25hdHVyZToKUHJvamVjdCBieSBBdm5pc2ggS3VtYXIKUG9ydGZvbGlvOiBodHRwczovL3RoZWF2bmlzaGt1bWFyLmluCkdpdEh1YjogaHR0cHM6Ly9naXRodWIuY29tL3RoZWF2bmlzaGt1bWFyL29ubGluZS1hdWN0aW9uLXN5c3RlbQ==";
        window[_0x18a84d] = function () {
          console["log"](atob(_0x302c74));
        };
      })();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
